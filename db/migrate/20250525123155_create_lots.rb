class CreateLots < ActiveRecord::Migration[8.0]
  def change
    create_table :lots do |t|
      t.integer :code
      t.references :package, null: true, foreign_key: true

      t.timestamps
    end
  end
end
