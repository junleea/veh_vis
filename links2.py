import pymysql
conn = pymysql.connect(
            host="www.ylxteach.net",
            port=3366,
            user="Administrator",
            passwd="XWClassroom20202023",
            db="demo",
            charset="utf8",
            cursorclass=pymysql.cursors.DictCursor,
        )
def get_info_mysql(sql):
    result = []
    # 使用 cursor() 方法创建一个游标对象 cursor
    try:
        # 创建数据库连接
        
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

def getCars():
    sql="select CI_CarPlate,count(zakk_carinfo_202310.CI_CarPlate) as num from zakk_carinfo_202310 where  CI_ThroughTime < '2023-10-01 23:59:59' and CI_ThroughTime > '2023-10-01 00:00:00' group by CI_CarPlate order by num desc limit 50;"
    cars=[]
    list1 = get_info_mysql(sql)
    for row in list1:
        if len(row['CI_CarPlate'])>4:
            cars.append(row['CI_CarPlate'])
    return cars

def getTracks(car_name):
    sql="select CI_CarPlate,CI_AddressId,CI_ThroughTime from zakk_carinfo_202310 where  CI_ThroughTime < '2023-10-01 23:59:59' and CI_ThroughTime > '2023-10-01 00:00:00' and CI_CarPlate='"+car_name+"' order by CI_ThroughTime;"
    tracks=[]
    list1 = get_info_mysql(sql)
    s=set()
    for i in range(1,len(list1)):
        row = list1[i]
        if len(row['CI_AddressId']) not in s:
            #print(type(row['CI_ThroughTime']))
            #时间通过时间CI_ThroughTime之差在10分钟以上的连接线不显示
            s.add(row['CI_AddressId'])
            tracks.append(row['CI_AddressId'])
    return list1

def getNode():
    sql="select CI_AddressId,count(CI_AddressId) as num from zakk_carinfo_202310 where  CI_ThroughTime < '2023-10-01 23:59:59' and CI_ThroughTime > '2023-10-01 00:00:00'  group by CI_AddressId order by num desc ;"
    nodes=[]
    list1 = get_info_mysql(sql)
    for row in list1:
        nodes.append({"id":row['CI_AddressId'],"value":row['num']})
    return nodes


def getLinks(cars):
    links = []
    for car in cars:
        tracks = getTracks(car)
        for i in range(1,len(tracks)):
            if tracks[i]["CI_AddressId"] == tracks[i-1]["CI_AddressId"]:
                continue
            links.append({"source":tracks[i-1]["CI_AddressId"],"target":tracks[i]["CI_AddressId"],"time":(tracks[i]["CI_ThroughTime"]-tracks[i-1]["CI_ThroughTime"]).seconds})
        break
    links2 = []
    for link in links:
        if link["time"] < 300:
            links2.append({"source":link["source"],"target":link["target"]})
    print("len1, len2=",len(links),len(links2))
    with open('links.json','w') as f:
        f.write(str(links))
    with open('links2.json','w') as f:
        f.write(str(links2))
    
if __name__ == "__main__":
    cars=getCars()
    getLinks(cars)
    #print(getNode())



