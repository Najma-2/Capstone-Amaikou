class CartItemsController < ApplicationController
    skip_before_action :authorize, only: [:destroy]

    def index
       render json: current_user.cart.cart_items.to_json(cart_item_serializer_options)
    end
 
    def show
       cartItem = CartItem.find(params[:id]) 
       render json: cartItem.to_json(cart_item_serializer_options) 
    end
 
    def create 
       cartItem = current_user.cart.cart_items << CartItem.new(cart_item_params)
       render json: cartItem.to_json()
    end
 
    def update
      puts "update"
      cart = current_user.cart
      cart.cart_items.where(item_id: params[:item_id]).destroy_all
      cart.cart_items << CartItem.new(
         item_id: params[:item_id], 
         quantity: params[:quantity],

      )
      render json: cart.cart_items.to_json()
    end
 
    def destroy
      cartItem = CartItem.find(params[:id])
      cart = cartItem.cart
      cart.cart_items.where(item_id: cartItem.item_id).destroy_all
      render json: cart.cart_items
   end
 
     private
 
    def cart_item_serializer_options()
       {
          except: [:created_at, :updated_at]
       }
    end
 
    def cart_item_params
       params.permit(:cart_id, :item_id, :quantity)
       
   end
end
