import createId from "../../utils/createId.js";
import { reviewRepository } from "./ReviewRepository.js";

class ReviewService { 
    constructor(repository){ 
        this.repository = repository
    }

    async getReviews(){ 
        const reviewList = await this.repository.getReviews(); 
        return reviewList
    }

    async getReviewByEmail(email){ 
        const review = await this.repository.getReviewByEmail(email); 
        return review
    }

    async getReviewById(id){ 
        const review = await this.repository.getReviewById(id)
        return review
    }

    async addReview(data){ 
        const id = createId()

        await this.repository.addReview({...data, id})
    }


    async deleteReview(id){ 
        await this.repository.deleteReview(id)
    }
}

export const reviewService = new ReviewService(reviewRepository)