from flask import Flask, request, render_template
import pymysql
from flask_cors import CORS  # 跨域请求模块
from jinja2 import Environment, FileSystemLoader
from datetime import datetime
import redis
import json, os
from werkzeug.utils import secure_filename
from gevent import pywsgi
from mongo import *

import data as data_d

app = Flask(__name__,static_folder='./static/assets',template_folder = "./static")
CORS(app)  # 处理跨域请求



def get_info_mysql(sql):
    result = []
    # 使用 cursor() 方法创建一个游标对象 cursor
    try:
        # 创建数据库连接
        conn = pymysql.connect(
            host="www.ylxteach.net",
            port=3366,
            user="Administrator",
            passwd="XWClassroom20202023",
            db="demo",
            charset="utf8",
            cursorclass=pymysql.cursors.DictCursor,
        )
        # 在这里进行数据库操作
        cursor = conn.cursor()
        cursor.execute(sql)
        result = cursor.fetchall()
    except Exception as e:
        print("err:",e)
        return []
    finally:
        cursor.close()
    return result

def getLinks(begin,end):
    sql = "SELECT * FROM zakk_carinfo_202310 WHERE  CI_ThroughTime < '"+end+"' and CI_ThroughTime > '"+begin+"' and CI_AddressId in (SELECT CI_AddressId FROM zakk_carinfo_202310 WHERE  CI_ThroughTime < '"+end+"' and CI_ThroughTime > '"+begin+"' group by CI_AddressId having count(CI_AddressId) > 1) order by CI_ThroughTime;"
    return get_info_mysql(sql)


@app.route("/node_data", methods=["GET","POST"])
def getNodeData():
    try:
        
        begin=''
        end=''
        if request.method == 'POST':
            data = request.get_json()
            print('data:',data)
            begin = data['begin']
            end = data['end']
        sql = "select CI_AddressId,count(CI_AddressId) as num from zakk_carinfo_202310 where  CI_ThroughTime < '"+end+"' and CI_ThroughTime > '"+begin+"'  group by CI_AddressId order by num;"
        nodes=[]
        list1 = get_info_mysql(sql)
        for row in list1:
            nodes.append({"id":row['CI_AddressId'],"value":row['num']})
        links_ = data_d.getLinksCars()
        links = []
        for l in links_:
            links.append(links_[l])
        print("links:",links)
        return {"nodes":nodes,"links":links}
    except Exception as e:
        print(e)
        return "false"

@app.route("/vehicle_track", methods=["GET","POST"])
def getVehicleTrack():
    try:
        car_id=''
        begin=''
        end=''
        if request.method == 'POST':
            data = request.get_json()
            print('data:',data)
            car_id = data['car_id']
            begin = data['begin']
            end = data['end']
        car_id='川JS1089'
        sql = "select CI_AddressId from zakk_carinfo_202310 where  CI_ThroughTime < '"+end+"' and CI_ThroughTime > '"+begin+"' and CI_CarPlate='"+car_id+"' order by CI_ThroughTime;"
        print(sql)
        list1 = get_info_mysql(sql)
        result=[]
        s =set()

        for l in list1:
            if l['CI_AddressId'] not in s:
                s.add(l['CI_AddressId'])
                result.append(l['CI_AddressId'])
        resp=[{"carId":car_id,"nodes":result,"color": "red"}]
        print(result)
        return resp
    except:
        return "false"

@app.route('/',methods=['GET','POST'])
def init():
    return render_template('index.html')

if __name__ == "__main__":
    static_folder='./static' #设置静态文件夹目录
    app.config["JSON_AS_ASCII"] = False
    # 以下是服务器对外公开可以改为:app.run()
    # server = pywsgi.WSGIServer(('0.0.0.0', 5000), app)
    # server.serve_forever()
    app.run(host="0.0.0.0", port=5000)