class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:show, :feed, :notifications] # 認証が必要なアクション

  def show
    @user = User.find(params[:id])
    @posts = @user.posts.includes(:comments) # N+1問題を回避
  end

  def feed
    # フォローしたユーザーの最新の投稿を取得
    @feed_posts = current_user.feed_posts.includes(:user)
  end

  def notifications
    @notifications = current_user.notifications.order(created_at: :desc)
  end
end
