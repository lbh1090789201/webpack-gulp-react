FactoryGirl.define do
  factory :plan, :class => 'plan' do
    name 'vip1'
    may_recieve "10"
    may_release "10"
    may_set_top "10"
    may_view "10"
    may_join_fairs "10"
    status true
  end
end