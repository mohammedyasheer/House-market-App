import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, startAfter, limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../component/Spinner'
import ListingItem from '../component/ListingItem'

function Offers() {

    const [listing, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    const params = useParams()

    useEffect(() => {
        const fetchListing = async() => {
       try {
            //Get reference for the collection
            const listingRef = collection(db, 'listings')

            //Create Query
            const q = query(listingRef, 
                where('offer', '==', true),
                orderBy('timestamp', 'desc'),
                limit(10)
                )
            // Execute query
            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

            const listings = [];

            querySnap.forEach((doc) => {
                console.log(doc);
               return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
            setListings(listings)
            setLoading(false)
     
        } catch (error) {
            console.log(error)
            toast.error('Could not fetch the listings')
        }
           
      }
        fetchListing()
    }, [])

    const onFetchMoreListings = async () => {
        try {
          // Get reference
          const listingsRef = collection(db, 'listings')
    
          // Create a query
          const q = query(
            listingsRef,
            where('offer', '==', true),
            orderBy('timestamp', 'desc'),
            startAfter(lastFetchedListing),
            limit(10)
          )
    
          // Execute query
          const querySnap = await getDocs(q)
    
          const lastVisible = querySnap.docs[querySnap.docs.length - 1]
          setLastFetchedListing(lastVisible)
    
          const listings = []
    
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            })
          })
    
          setListings((prevState) => [...prevState, ...listings])
          setLoading(false)
        } catch (error) {
          toast.error('Could not fetch listings')
        }
      }
    
  return (
    <div className='category'>
        <header>
            <p className="pageHeader">
               Offers
            </p>
        </header>
        {loading ? <Spinner /> : listing &&  listing.length > 0 ? <>
                <main>
                    <ul className="categoryListings">
                    {listing.map((listing) => (
                        <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                    ))}
                    </ul>
                </main>
                <br />
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </> : <p>There are no offers currently</p>}
    </div>
  )
}

export default Offers