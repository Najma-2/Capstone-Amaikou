class CartSerializer < ActiveModel::Serializer
  attributes :id, :cart_items, :items
  belongs_to :user
  has_many :cart_items
  has_many :items, through: :cart_items
end
