from flask import Flask, render_template
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import config

# ------------------------------------------
# 오류 페이지 정의
# def page_not_found(e):
#     return render_template('404.html'), 404
# ------------------------------------------

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    load_dotenv()
    app = Flask(__name__, static_url_path="/")
    app.config.from_object(config)

    CORS(app)

    # ORM
    db.init_app(app)
    migrate.init_app(app, db)

    import models

    # blueprint
    from apis.ranks import ranks

    app.register_blueprint(ranks)

    from apis.review_restaurant import reviews

    app.register_blueprint(reviews)

    from apis.what_to_eat import what_to_eat

    app.register_blueprint(what_to_eat)

    return app


if __name__ == "__main__":
    create_app().run(port=5000, debug=True)
