class CreateItems < ActiveRecord::Migration[8.0]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :weight
      t.decimal :price
      t.decimal :service_fee
      t.decimal :country_fee
      t.decimal :total

      t.references :package, null: true, foreign_key: true
      t.references :lot, null: false, foreign_key: true
      t.references :customer, null: true, foreign_key: true

      t.timestamps
    end
  end
end
