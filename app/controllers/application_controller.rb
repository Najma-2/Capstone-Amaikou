class ApplicationController < ActionController::API
  include ActionController::Cookies

# rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response
# rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  before_action :authorize

  def current_user
    User.find_by(id: session[:user_id])
  end

  def authorize
    render json: {errors:["Please login"]}, status: :unauthorized unless current_user
  end

end
