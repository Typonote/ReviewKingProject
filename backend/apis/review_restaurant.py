from flask import Blueprint, jsonify
from flask_restful import Resource, Api, reqparse
from models import Restaurants, Categories, Reviews, TotalRating

reviews = Blueprint("reviews", __name__)
api = Api(reviews)

# request를 받기 위해서는 parser에 argument 추가 필요
parser = reqparse.RequestParser()
parser.add_argument("restaurant_name", type=str)


class ReviewRestaurant(Resource):
    # 음식점 검색창 제공
    def get(self):
        # 지도 제공
        restaurant_data = Restaurants.query.all()

        data = dict()
        for restaurant in restaurant_data:
            category = Categories.query.filter(
                Categories.id == restaurant.category_id
            ).first()
            tmp = {
                "name": restaurant.name,
                "lng": restaurant.longitude_x,
                "lat": restaurant.latitude_y,
                "img": restaurant.img_url,
                "category": category.category,
            }
            data[f"{restaurant.name}"] = tmp

        return jsonify(status=200, data=data)

    # 검색어에 대한 결과 전송
    def post(self):
        args = parser.parse_args()
        name = args["restaurant_name"].strip()

        restaurants = Restaurants.query.filter(Restaurants.name.like(f"%{name}%")).all()

        data = dict()
        for restaurant in restaurants:
            total_rating = TotalRating.query.filter(
                restaurant.id == TotalRating.restaurant_id
            ).first()
            restaurant_reviews = Reviews.query.filter(
                restaurant.id == Reviews.restaurant_id
            ).all()
            tmp = {
                "name": restaurant.name,
                "naver": total_rating.naver,
                "kakao": total_rating.kakao,
                "mango": total_rating.mango,
                "siksin": total_rating.siksin,
                "reviews": [
                    restaurant_review.content
                    for restaurant_review in restaurant_reviews
                ],
            }
            data[f"{restaurant.name}"] = tmp

        return jsonify(status=200, data=data)


api.add_resource(ReviewRestaurant, "/reviews")
