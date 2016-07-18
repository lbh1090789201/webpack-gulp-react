class Webapp::JobsController < ApplicationController
  before_action :authenticate_user!   # 登陆验证

   def index
   end

   def show
     @job = Job.find params[:id]
     is_applied = ApplyRecord.is_applied(current_user.id , params[:id])
     resume = Resume.find_by_user_id current_user.id
     maturity = resume.maturity - 74 if resume.present?
     is_favor = FavoriteJob.is_favor(current_user.id, params[:id])

     @btn_apply = btn_info(is_applied, has_resume)
     @btn_favor = btn_favor(is_favor)
     @hospital = Hospital.find_by(:id => @job.hospital_id)
     @jobs = Job.where(:hospital_id => @hospital.id).length
   end


   # private
   # def job_params
   #   params.require(:job).permit(:name, :job_type, :salary_range, :location)
   # end
   private
   #根据情况回传按钮状态
   def btn_info(is_applied, maturity)
     if is_applied
       return {css: 'is_applied', img_url: "icon_34.png", text: '已应聘'}
     else
       if maturity > 0
         return {css: 'no_applied', img_url: "icon_35.png", text: '应聘职位'}
       else
         return {css: 'no_resume', img_url: "icon_35.png", text: '应聘职位'}
       end
     end
   end

   def btn_favor(is_favor)
     if is_favor
       return {css: "is_favor", img_url: "star_yellow.png", text: "已收藏"}
     else
       return {css: "no_favor", img_url: "star_black.png", text: "收藏职位"}
     end
   end

end
