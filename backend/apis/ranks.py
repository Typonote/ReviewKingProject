from flask import Blueprint, jsonify
from flask_restful import Resource, Api, reqparse
from models import Restaurants, Categories, Reviews, TotalRating, Menus
from sqlalchemy.sql import func
from app import db

ranks = Blueprint("ranks", __name__)
api = Api(ranks)

# request를 받기 위해서는 parser에 argument 추가 필요
parser = reqparse.RequestParser()
parser.add_argument("category", type=str)


class Ranks(Resource):
    # 음식 카테고리 제공
    def get(self):
        # 카테고리들 모두 불러오기
        categories_data = Categories.query.all()

        data = dict()
        for category_data in categories_data:
            restaurant = Restaurants.query.filter_by(
                category_id=category_data.id
            ).first()
            # 랜덤하게 img_url 선택하기
            img_url = restaurant.img_url
            data[f"{category_data.category}"] = img_url

        return jsonify(status=200, data=data)

    # 선택한 카테고리에 대한 결과 전송
    def post(self):
        args = parser.parse_args()
        category = args["category"].strip()

        category_id = Categories.query.filter_by(category=category).first().id

        # 해당 카테고리의 상위 평점 3개의 음식점 제공
        restaurants_rated = (
            Restaurants.query.join(TotalRating)
            .filter(Restaurants.category_id == category_id)
            .order_by(TotalRating.integrated_rating.desc())[:3]
        )

        data = dict()
        rank = 1
        result = []
        for restaurant in restaurants_rated:
            menus = Menus.query.filter_by(restaurant_id=restaurant.id).all()
            total_rating = TotalRating.query.filter_by(
                restaurant_id=restaurant.id
            ).first()
            tmp = {
                "name": restaurant.name,
                "integrated_rating": total_rating.integrated_rating,
                "img_url": restaurant.img_url,
                "menus": [menu.name for menu in menus],
                "rank": rank,
            }
            result.append(tmp)
            rank += 1
        data["result"] = result

        return jsonify(status=200, data=data)


api.add_resource(Ranks, "/ranks")
