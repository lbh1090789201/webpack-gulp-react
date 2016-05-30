require 'rails_helper'

RSpec.describe Webapp::WorkExperiencesController, type: :controller do
  render_views
<<<<<<< HEAD
  let (:json) { JSON.parse(response.body) }
=======
  let(:json) { JSON.parse(response.body) }
>>>>>>> 3dab4bfb8c043fd4c303bf76036be65591670fff

  before :each do
    @user = create(:user)
    login_with @user
    request.env['devise.mapping'] = Devise.mappings[:user]
  end

<<<<<<< HEAD
  # 页面测试开始
=======
  # 测试
>>>>>>> 3dab4bfb8c043fd4c303bf76036be65591670fff
  describe 'GET #index' do
    it 'returns http success' do
      get :index
      expect(response.status).to eq(200)
    end
  end

<<<<<<< HEAD
  describe 'GET #edit' do
    it 'returns http success' do
      get :edit, id: @user.id
      expect(response.status).to eq(200)
    end
  end

=======
>>>>>>> 3dab4bfb8c043fd4c303bf76036be65591670fff
  describe 'GET #show' do
    it 'returns http success' do
      get :show, id: @user.id
      expect(response.status).to eq(200)
    end
  end

  describe 'GET #new' do
    it 'returns http success' do
<<<<<<< HEAD
      get :new
=======
      get :new, id: @user.id
>>>>>>> 3dab4bfb8c043fd4c303bf76036be65591670fff
      expect(response.status).to eq(200)
    end
  end

<<<<<<< HEAD
  describe "PATCH #update" do
    before :each do
      @work_experience = create(:work_experience)
    end

    context "valid attributes" do
      it "locates the requested @work_experience" do
        expect do
          patch :update,id=>@user.id, work_experience:attributes_for(:work_experience)
          expect(assigns(:contact))==(@work_experience)
        end
      end
    end
  end

  describe "DELETE #destroy" do
    before :each do
      @work_experience = create(:work_experience)
    end

    it "deletes the work_experience" do
      expect do
        expect{delete :destroy, id=>@user.id}.to change(WorkExperience,:count).by(-1)
      end
    end

    it "redirects to work_experience#index " do
      expect do
        delete :destroy, id=>@user.id
        expect(response).to redirect_to webapp_work_experience_path
      end
    end
  end
=======
  describe 'GET #edit' do
    it 'returns http success' do
      get :edit, id: @user.id
      expect(response.status).to eq(200)
    end
  end

>>>>>>> 3dab4bfb8c043fd4c303bf76036be65591670fff

end
