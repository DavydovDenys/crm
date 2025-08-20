class Item < ApplicationRecord
  belongs_to :package, optional: true
  belongs_to :lot
  belongs_to :customer, optional: true

  validates :name, presence: true, length: { minimum: 3, maximum: 100 }
  validates :lot_id, presence: true, uniqueness: true
  validates :weight, numericality: { greater_than: 0, allow_nil: true }
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :service_fee, numericality: { greater_than_or_equal_to: 0, allow_nil: true }
  validates :internal_shipping_costs, numericality: { greater_than_or_equal_to: 0, allow_nil: true }
  validates :country_fee, numericality: { greater_than_or_equal_to: 0, allow_nil: true }
  validates :code, presence: true
end
