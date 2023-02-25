class ItemSerializer < ActiveModel::Serializer
    attributes :name, :cost, :image, :description
    belongs_to :cart
  end