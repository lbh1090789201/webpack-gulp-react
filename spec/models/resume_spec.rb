require 'rails_helper'

RSpec.describe Resume, type: :model do

    it "has a valid factory" do
      expect(build(:resume)).to be_valid
    end

    it "test filter filter_maturity num" do
      @resume = create(:resume, maturity: 80)
      @resume2 = create(:resume, maturity: 70)

      res = Resume.filter_maturity(70)

      expect(res.length).to eq(1)
    end

    it "test filter_no_freeze filter_is_freeze" do
      @resume = create(:resume, resume_freeze: true)
      @resume2 = create(:resume)
      @resume3 = create(:resume)

      res = Resume.filter_no_freeze
      res2= Resume.filter_is_freeze

      expect(res.length).to eq(2)
      expect(res2.length).to eq(1)
    end

    it "test refresh_left" do
      @resume = create(:resume, refresh_at: Time.now - 3.days)
      @resume2 = create(:resume, refresh_at: Time.now - 8.days)
      @resume3 = create(:resume, refresh_at: nil)
      res = Resume.refresh_left(@resume.id)
      res2 = Resume.refresh_left(@resume2.id)
      res3 = Resume.refresh_left(@resume3.id)

      expect(res).to eq(4)
      expect(res2).to eq(false)
      expect(res3).to eq(false)
    end

    it "test Resume.info" do
      @user = create(:user)
      @resume = create(:resume, user_id: @user.id)
      @expect_job = create(:expect_job, user_id: @user.id)

      res = Resume.info @user.id
      expect(res.length).to eq(10)
    end

    describe "test filter" do
      before :each do
        @user = create(:user, location: "武汉")
        @resume = create(:resume, user_id: @user.id)
      end

      it "test filter_by_city" do
        res = Resume.filter_by_city "武汉"
        expect(res.length).to eq(1)
      end
    end

    # 测试简历完整度
    describe 'test get_maturity' do
      before :each do
        @user = create(:user)
        @resume = create(:resume, user_id: @user.id)
        @education_experience = create(:education_experience, user_id: @user.id)
        @expect_job = create(:expect_job, user_id: @user.id)
      end

      it "no resume" do
        res = Resume.get_maturity 999
        expect(res).to eq(0)
      end

      it "test maturity = 100" do
        res = Resume.get_maturity @user.id
        expect(res).to eq(100)
      end

      it "test lack user" do
        @user.birthday = nil
        @user.save!

        res = Resume.get_maturity @user.id
        expect(res).to eq(75)
      end

      it "test incomplete user" do
        @user.birthday = nil
        @user.save!

        res = Resume.get_maturity @user.id
        expect(res).to eq(75)
      end

      it "test without education_experience" do
        @education_experience.destroy!

        res = Resume.get_maturity @user.id
        expect(res).to eq(75)
      end

      it "test without expect_job" do
        @expect_job.destroy!

        res = Resume.get_maturity @user.id
        expect(res).to eq(75)
      end

      # it "test lack of avatar" do
      #   @user.update_attributes(avatar: false)
      #
      #   puts '------------ava' + @user.avatar.to_s
      #
      #   res = Resume.get_maturity @user.id
      #   expect(res).to eq(75)
      # end

    end
end
