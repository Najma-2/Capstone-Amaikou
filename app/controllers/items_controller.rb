class ItemsController < ApplicationController
    skip_before_action :authorize, only: [:index, :destroy]

    def index
       render json: Item.all.to_json()
    end
 
    def show
       item = Item.find(params[:id]) 
       render json: item.to_json() 
    end
 
    def create 
       item = Item.new(item_params)
       
       item.save
       render json: item.to_json()
    end
 
    def update
       item = Item.find(params[:id])
       item.update()
   
       render json: item.to_json()
    end
 
    def destroy
       item = Item.find(params[:id])
       item.destroy
   end
 
     private
 
   
 
    def item_params
       params.permit(:name, :cost, :image, :description)
      
   end
end