class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :id, :first_name, :last_name, :cart
  has_one :cart
end
