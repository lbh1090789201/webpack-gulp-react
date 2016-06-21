require 'rails_helper'

RSpec.describe Employer::ResumesController, type: :controller do
  render_views
  let(:json) { JSON.parse(response.body) }

  before :each do
    @user = create(:user)
    @user.add_role :gold
    login_with @user
    request.env['devise.mapping'] = Devise.mappings[:user]
  end


  describe "GET #index" do
    it "returns http success" do
      hospital = create :hospital
      employer = create :employer, user_id: @user.id, hospital_id: hospital.id
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "returns http success" do
      resume = create(:resume, user_id: @user.id)

      hospital = create :hospital
      job = create(:job, hospital_id: hospital.id)
      expect_job = create(:expect_job, user_id: @user.id)

      get :show, id: resume.id, job_id: job.id
      expect(response).to have_http_status(:success)
    end
  end

end