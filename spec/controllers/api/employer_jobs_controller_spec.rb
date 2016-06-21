require 'rails_helper'

RSpec.describe Api::EmployerJobsController, type: :controller do
  render_views
  let (:json) { JSON.parse(response.body) }

  before :each do
    @user = create(:user)
    @user.add_role :gold
    login_with @user
    request.env['devise.mapping'] = Devise.mappings[:user]

    @job = create(:job)
  end

  # 页面测试开始
  describe 'employer refresh job refresh_at or status' do
    it "returns http success" do
      patch :update, format: :json, refresh_at: Time.now, job_id: @job.id
      expect(response.status).to eq(200)
    end
  end
end
