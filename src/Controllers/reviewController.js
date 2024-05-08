import { reviewService } from "../Arquitecture/Review/ReviewService.js"

export async function getReviews(req, res) { 
    try{
    const reviewList = await reviewService.getReviews()
    res.status(200).json(reviewList)
    }catch(error){ 
        res.status(400).json({error: error.message})
    }
}

export async function getReviewById({ params }, res){ 
    try{
    const review = await reviewService.getReviewById(params.id)
    res.status(200).json(review)
    }catch(error){ 
        res.status(400).json({error: error.message})
    }
}

export async function getReviewByEmail(req, res){
    try {
        const { email } = req.body
        const reviews = await reviewService.getReviewByEmail(email)
        res.status(200).json({message: reviews})  
    } catch (error) {
        res.status(400).json({error: error.message})
    } 
}

export async function addReview(req, res){

    try {
        await reviewService.addReview(req.body)
        res.status(201).json({message: "review added"}) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function deleteReview(req, res){
    try {
        await reviewService.deleteReview(req.params.id)
        res.status(200).json({ message: "review deleted succesfully" })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


