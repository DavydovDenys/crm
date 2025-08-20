class CreatePackages < ActiveRecord::Migration[8.0]
  def change
    create_table :packages do |t|
      t.integer :weight
      t.decimal :items_price
      t.decimal :shipping_cost

      t.timestamps
    end
  end
end
