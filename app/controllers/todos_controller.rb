class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @todos = Todo.order("created_at DESC")
    # @todos = Todo.all
    respond_to do |format|
      format.html
      format.json do
        render json: @todos
      end
    end
  end

  def create
    todo = Todo.create(todo_param)
    puts(todo)
    respond_to do |format|
      format.html
      format.json do
        render json: todo
      end
    end
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(todo_param)
    respond_to do |format|
      format.html
      format.json do
        render json: todo
      end
    end
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content, status: :ok
  end

  private
  def todo_param
    params.require(:todo).permit(:title, :done)
  end
end
