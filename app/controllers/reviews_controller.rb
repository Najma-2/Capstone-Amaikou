class ReviewsController < ApplicationController
    skip_before_action :authorize, only: [:index, :destroy]

    def index
       render json: Review.all.to_json()
    end
 
    def show
       review = Review.find(params[:id]) 
       render json: review.to_json() 
    end
 
    def create 
       review = Review.new(review_params)
       
       review.save
       render json: review.to_json()
    end
 
    def update
       review = Review.find(params[:id])
       review.update()
    
       render json: review.to_json()
    end
 
    def destroy
       review = Review.find(params[:id])
       review.destroy
   end
 
     private
 
    def ()
       {
          except: [:created_at, :updated_at]
       }
    end
 
    def review_params
       params.permit(:user, :item, :comment, :rating)
       
   end
end