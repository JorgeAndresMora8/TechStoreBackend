import { ReviewDAO } from "../../DB/DAO.js";

class ReviewRepository { 
    constructor(DAO){ 
        this.DAO = DAO
    }

    async getReviews(){ 
        const reviewList = await this.DAO.get_all(); 
        return reviewList
    }

    async getReviewByEmail(email){ 
        const review = await this.DAO.get_by_email(email); 
        return review
    }

    async getReviewById(id){ 
        const review = await this.DAO.get_by_id(id); 
        return review
    }

    async addReview(data){ 
        await this.DAO.create(data)
    }


    async deleteReview(id){ 
        await this.DAO.delete(id)
    }
}

export const reviewRepository = new ReviewRepository(ReviewDAO)