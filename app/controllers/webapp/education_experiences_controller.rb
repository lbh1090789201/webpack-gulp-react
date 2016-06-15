class Webapp::EducationExperiencesController < ApplicationController
  before_action :authenticate_user!   # 登陆验证

  def index
    @education_experiences = EducationExperience.where(:user_id => current_user.id)
  end

  def new
    @education_experience = EducationExperience.new
  end

  def create
    education_experience = EducationExperience.new education_experience_params
    education_experience.user_id = current_user.id

    if education_experience.save
      # 更新简历完整度
      resume_maturity = Resume.get_maturity current_user.id

      flash.now[:notice] = "创建成功！"
      render js: ' history.go(-1);'
    else
      redirect_to :back, alert: "添加失败"
      return
    end
  end

  def edit
    @education_experience = EducationExperience.find_by_id params[:id]
    @education_experience.graduated_at = @education_experience.graduated_at.strftime('%Y-%m-%d')
  end

  def update
    @education_experience = EducationExperience.find_by_id params[:id]

    if @education_experience.update(education_experience_params)
      render js: ' history.go(-1);', notice: '修改成功！'
    else
      redirect_to :back, alert("修改失败")
      return
    end
  end

  def destroy
    @education_experience = EducationExperience.find(params[:id])
    if @education_experience.destroy
      # redirect_to webapp_education_experiences_path, alert:"用户删除成功！"
      render js: ' history.go(-1);', notice: '删除成功！'
    else
      redirect_to :back, alert:"删除失败，请重新操作！"
    end
  end

  private
  def education_experience_params
    params.require(:education_experience).permit(:college, :education_degree, :major, :entry_at, :graduated_at)
  end

end
