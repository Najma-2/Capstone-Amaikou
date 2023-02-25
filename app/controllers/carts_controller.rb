class CartsController < ApplicationController
    

    def index
       render json: Cart.all.to_json()
    end
 
    def show
       cart = Cart.find(params[:id]) 
       render json: cart.to_json() 
    end
 
    def create 
       cart = Cart.new(cart_params)
       cart.save
       render json: cart.to_json()
    end
 
    def update
       cart = Cart.find(params[:id])
       cart.update()
    
       render json: cart.to_json()
    end
 
    def destroy
       cart = Cart.find(params[:id])
       cart.cart_items.destroy_all
   end
 
     private
 
    
 
    def cart_params
       params.permit(:cart_items, :user_id, )
       
   end
end