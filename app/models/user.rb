class User < ActiveRecord::Base #用户
  rolify
  # resourcify
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          #:confirmable,
         :omniauthable
  include DeviseTokenAuth::Concerns::User

  # Use friendly_id on Users
  extend FriendlyId
  friendly_id :friendify, use: :slugged
  mount_uploader :avatar, AvatarUploader
  # mount_uploader :main_video, AlbumnUploader


  # for user_albumns
  has_one :role
  has_many :favorite_articles, :dependent => :destroy
  has_many :notes, :dependent => :destroy
  has_many :comment
  has_many :recommend

  # necessary to override friendly_id reserved words
  def friendify
    if username.downcase == "admin"
      "user-#{username}"
    else
      "{username}"
    end
  end

  # Pagination
  paginates_per 100

  # Validations
  # :username
  validates :username, uniqueness: { case_sensitive: false }
  validates_format_of :username, with: /\A[a-zA-Z0-9]*\z/, on: :create, message: "can only contain letters and digits"
  validates :username, length: { in: 4..45 }

  def self.paged(page_number)
    #order(admin: :desc, username: :asc).page page_number
    order(username: :asc).page page_number
    order(username: :asc).page page_number
  end

  def self.search_and_order(search, page_number)
    if search
      where("username LIKE ?", "%#{search.downcase}%").order(
      #admin: :desc, username: :asc
      username: :asc
      ).page page_number
    else
      #order(admin: :desc, username: :asc).page page_number
      order(username: :asc).page page_number
    end
  end

  def self.last_signups(count)
    order(created_at: :desc).limit(count).select("id","username","slug","created_at")
  end

  def self.last_signins(count)
    order(last_sign_in_at:
    :desc).limit(count).select("id","username","slug","last_sign_in_at")
  end

  #获取User基本信息 bobo
  def self.get_user_main(user_id)
    user = User.select(:id, :show_name, :sex, :highest_degree, :start_work_at, :birthday, :user_email,
                                :location, :cellphone, :email,  :seeking_job, :position).find_by_id(user_id)
  end

  #判断是否填过简历 bobo
  def self.highest_degree(user_id)
    !User.find_by_id(user_id)[:highest_degree].nil?
  end

  #按 创建时间 筛选 bobo
  scope :filter_create_after, -> (time){
    where('created_at > ?', time) if time.present? && !time.blank?
  }

  scope :filter_create_before, -> (time){
    where('created_at < ?', time.to_datetime + 1.day) if time.present? && !time.blank?
  }

  #按 角色 role 筛选
  scope :filter_by_role, -> (role){
    # includes(:roles).select("roles.*").where('roles.name' => role).references(:roles)
    where(user_type: role) if role.present?
  }

  #按 role scoped 筛选
  scope :filter_by_manager, -> (manager){
    manager = manager.to_sym
    with_role manager if manager.present?
  }

  #按用户名筛选
  scope :filter_by_name, ->(show_name){
    where("show_name LIKE '%"+show_name+"%'" ) if show_name.present?
  }

  def admin?
    has_role? 'admin'
  end

  def employer?
    has_role? 'gold'
  end

  def jobs_manager?
    has_role? 'jobs_manager'
  end

  def resumes_manager?
    has_role? 'resumes_manager'
  end

  def hospitals_manager?
    has_role? 'hospitals_manager'
  end

  def fairs_manager?
    has_role? 'fairs_manager'
  end

  def vips_manager?
    has_role? 'vips_manager'
  end

  def acounts_manager?
    has_role? 'acounts_manager'
  end

  def email_required?
    false
  end

end
