class ItemsController < ApplicationController
  def index
    @items = Item.all
  end

  def new
    @item = Item.new
  end

  def create
    @item = Item.new(item_params.except(:lot_code))
    lot = Lot.new(code: item_params[:lot_code])

    unless lot.valid?
      lot.errors.full_messages.each do |msg|
        @item.errors.add(:lot_code, msg)
      end
    end

    lot.save!
    @item.lot = lot

    if @item.valid?
      @item.save!
      redirect_to items_path, notice: "Item was successfully created."
    else
      binding.pry
      flash.now[:alert] = "Errors: <br>".html_safe + @item.errors.full_messages.join("<br>").html_safe
      render :new, status: :unprocessable_entity
    end
  end

  def item_params
    params.require(:item).permit(:lot_code, :name, :weight, :price, :service_fee,
                                  :internal_shipping_costs, :country_fee
                                )
  end
end
