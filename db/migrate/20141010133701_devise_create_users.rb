class DeviseCreateUsers < ActiveRecord::Migration

  def change
    create_table(:users) do |t|
      # merge user_info
      t.string :start_work_at #工作年限
      t.string :region #所在区域
      t.string :highest_degree #最高学历1
      t.datetime :birthday #出生年月
      t.string :position #职称，页面重构师……
      t.string :company #所属公司
      t.text :introduction #个人简介
      t.string :achievement #个人成就

      # added for a basic user
      t.string :cellphone,         :null => false, :default => "" #电话
      t.string :avatar   #头像
      t.string :show_name,         :null => false #姓名
      t.string :user_email #用户邮箱

      ## token authenticatable
      t.string :provider, :default => "email" #
      t.string :uid, :null => false, :default => "" #
      t.text :tokens #token

      ## Database authenticatable
      t.string :username,           :null => false, :default => ""
      t.string :email
      t.string :encrypted_password, :null => false, :default => ""

      ## Admin
      # t.boolean :admin, :null => false, :default => false

      ## Lock
      t.boolean :locked, :null => false, :default => false

      ## Friendly_id
      t.string :slug #

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, :default => 0, :null => false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      ## Confirmable
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email # Only if using reconfirmable #电话

      ## Lockable
      # t.integer  :failed_attempts, :default => 0, :null => false # Only if lock strategy is :failed_attempts
      # t.string   :unlock_token # Only if unlock strategy is :email or :both
      # t.datetime :locked_at
      t.string :sex #性别
      t.integer :user_number #用户APP端 ID
      t.string :user_type #用户类型  webapp/employer/admin

      t.string :longitude #实时经度
      t.string :latitude #实时纬度

      t.boolean :is_top, :null => false, :default => false #是否是置顶数据
      t.timestamps null: false
    end

    #add_index :users, [:uid, :provider],     :unique => true
    add_index :users, :cellphone
    add_index :users, :username,             :unique => true
    #add_index :users, :email,                :unique => true
    add_index :users, :reset_password_token, :unique => true
    add_index :users, :confirmation_token,   :unique => true
    add_index :users, :slug,                 :unique => true
    # add_index :users, :unlock_token,         :unique => true
  end
end
