include BdLbsHelper
class Webapp::UsersController < ApplicationController
  #bafore_filer代表需要加载请求头　except代表除开它指定的请求外其它都需要
  #bafore_filer注释后就整个不需要加载请求头
  before_action :authenticate_user!, only: [:edit, :save_user_previous_url, :index, :update]

  after_filter "save_user_previous_url", only: [:edit]

  def save_user_previous_url
    # session[:previous_url] is a Rails built-in variable to save last url.
    path = URI(request.referer || '').path
    logger.error '------path---------:' + path
    # logger.error '------current_user.id---------:' + current_user.id
    logger.error '------id---------:' + params[:id]

    if path != '/webapp/users/' + params[:id] + '/edit'
      session[:user_previous_url] = path
      if path == '/webapp/orders/new'
        str = ''
        if params[:order_type] != nil
          str = str + '&order_type=' + params[:order_type]
        end
        if params[:invited_id] != nil
          str = str + '&invited_id=' + params[:invited_id]
        end
        if params[:food_package_id] != nil
          str = str + '&food_package_id=' + params[:food_package_id]
        end
        if params[:restaurant_id] != nil
          str = str + '&restaurant_id=' + params[:restaurant_id]
        end
        if params[:detail] != nil
          str = str + 'detail=' + params[:detail]
        end
        if str.length > 0
          session[:user_previous_url] = path + '?' + str[1..-1]
        else
          session[:user_previous_url] = path
        end

        logger.error '------session[:user_previous_url]---------:' + session[:user_previous_url]
      end
    else

    end
  end


  def index

  end

  def edit
    @user = User.select(:id, :show_name, :sex, :work_time, :highest_degree,
                                 :cellphone, :email, :location, :job_status).find_by_id(1)
  end

  def update
    user = User.find_by_id(1) # 需要替换为 current_user.id

    if user.update(user_params)
      redirect_to :back
    else

    end
  end


  private

  def user_params
    params.require(:user).permit(:show_name, :sex, :work_time, :highest_degree,
                                 :cellphone, :email, :location, :job_status)
  end

end
