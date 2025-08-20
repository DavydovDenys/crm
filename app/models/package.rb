class Package < ApplicationRecord
  has_many :items
  has_many :lots

  validate :must_have_at_least_one_lot

  private

  def must_have_at_least_one_lot
    errors.add(:base, 'Package must have at least one lot') if lots.empty?
  end
end
