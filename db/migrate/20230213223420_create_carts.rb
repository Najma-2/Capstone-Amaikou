class CreateCarts < ActiveRecord::Migration[7.0]
  def change
    create_table :carts do |t|
      t.belongs_to :user
      t.integer :cart_items, array: true

      t.timestamps
    end
  end
end
