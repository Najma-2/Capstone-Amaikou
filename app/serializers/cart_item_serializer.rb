class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :cart_id, :item_id, :quantity
  belongs_to :cart

end
