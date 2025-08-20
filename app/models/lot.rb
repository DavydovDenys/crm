class Lot < ApplicationRecord
  has_many :items
  belongs_to :package, optional: true

  validates :code, presence: true
end
