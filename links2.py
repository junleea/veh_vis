import pymysql
import datetime
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
    sql="select CI_CarPlate,count(zakk_carinfo_202310.CI_CarPlate) as num from zakk_carinfo_202310 where  CI_ThroughTime < '2023-10-01 23:59:59' and CI_ThroughTime > '2023-10-01 00:00:00' group by CI_CarPlate order by num desc limit 30;"
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
    links2 = []
    for link in links:
        if link["time"] < 30:
            links2.append({"source":link["source"],"target":link["target"]})
    print("len1, len2=",len(links),len(links2))
    with open('links.json','w') as f:
        f.write(str(links))
    with open('links2.json','w') as f:
        f.write(str(links2))
    s=set()
    for link in links2:
        s.add(link["source"])
        s.add(link["target"])
    print(len(s))
    s1 = set()
    d = [{'id': 'JHNC', 'value': 33301}, {'id': 'XZP', 'value': 26363}, {'id': 'QJZLCHDD', 'value': 22241}, {'id': 'QJLK', 'value': 20928}, {'id': '', 'value': 15538}, {'id': 'SZP', 'value': 13745}, {'id': 'HYZT', 'value': 9585}, {'id': 'ZHDD', 'value': 9429}, {'id': 'DYZX', 'value': 7060}, {'id': 'JNLK', 'value': 4163}, {'id': 'TPHC', 'value': 3856}, {'id': 'LYQ', 'value': 3379}, {'id': 'JYHC', 'value': 3129}, {'id': 'HYJS', 'value': 2611}, {'id': 'TPZT', 'value': 2551}, {'id': 'YJQ', 'value': 2103}, {'id': 'DZP', 'value': 1995}, {'id': 'BJZT', 'value': 202}, {'id': 'BJQJ', 'value': 150}, {'id': 'SHUXIYILU', 'value': 92}]
    for d1 in d:
        s1.add(d1["id"])
    print(s1-s)

def getNodesCount():
    sql="select CI_AddressId as name,count(CI_AddressId) as value from zakk_carinfo_202310 group by CI_AddressId order by value desc ;"
    list1 = get_info_mysql(sql)
    return list1

def getCountByMonth():
    #获取每月的车辆数量
    sql="select month(CI_ThroughTime) as month,count(CI_CarPlate) as num from zakk_carinfo_202310 group by month(CI_ThroughTime) order by month(CI_ThroughTime);"
    list1 = get_info_mysql(sql)
    return list1

def getCountByWeek():
    #获取每周的车辆数量
    sql="select week(CI_ThroughTime) as week,count(CI_CarPlate) as num from zakk_carinfo_202310 group by week(CI_ThroughTime) order by week(CI_ThroughTime);"
    list1 = get_info_mysql(sql)
    return list1

def getCarPlateData(node):
    #车牌首字母
    sql = "select left(CI_CarPlate,1) as name,count(CI_CarPlate) as value from zakk_carinfo_202310 where CI_AddressId='XZP' group by left(CI_CarPlate,1) order by value desc;"
    list1 = get_info_mysql(sql)
    return list1


def getCarPlateByDay(node,date):
    #获取某天某节点的车��数量
    sql="select CI_CarPlate as name,count(CI_CarPlate) as value from zakk_carinfo_202310 where CI_AddressId="+str(node)+" and date(CI_ThroughTime)="+str(date)+" group by CI_CarPlate order by value desc;"
    list1 = get_info_mysql(sql)
    return list1

def getCarThroughTimeLatest():

    sql ="select distinct CI_CarPlate,CI_AddressId,CI_ThroughTime from zakk_carinfo_202310 order by CI_ThroughTime limit 50;"
    list1 = get_info_mysql(sql)
    return list1


def getPlateByDay():
    sql="SELECT DATE(CI_ThroughTime) AS day,LEFT(CI_CarPlate, 1) AS name,COUNT(*) AS num FROM zakk_carinfo_202310 GROUP BY DATE(CI_ThroughTime),LEFT(CI_CarPlate, 1) ORDER BY day,num DESC;"
    list1 = get_info_mysql(sql)
    return list1


def getAddressByDay():
    sql="select Date(zakk_carinfo_202310.CI_ThroughTime) as day,zakk_carinfo_202310.CI_AddressId,count(zakk_carinfo_202310.CI_AddressId) as num from zakk_carinfo_202310 where CI_ThroughTime > '2023-10-01' group by day,CI_AddressId  order by day,num desc;"
    list1 = get_info_mysql(sql)
    return list1

def getCountByDay():
    #获取每天的车辆数量
    sql="select date(CI_ThroughTime) as day,count(CI_CarPlate) as num from zakk_carinfo_202310 group by date(CI_ThroughTime) order by date(CI_ThroughTime);"
    list1 = get_info_mysql(sql)
    return list1


def getAddressAllCount():
    sql="select zakk_carinfo_202310.CI_AddressId as areaName,count(zakk_carinfo_202310.CI_AddressId) as count from zakk_carinfo_202310 group by CI_AddressId order by count desc;"
    list1 = get_info_mysql(sql)
    print(list1)

if __name__ == "__main__":
    getAddressAllCount()
    cars=getCars()
    getLinks(cars)
    
    #print(getNode())
    # end =getNodesCount()
    # print(end)
    # for row in end:
    #     print(row)
    #print(getCountByMonth())
    # print(getCountByWeek())
    # data = getCountByDay()
    # end=[]
    # e=[]
    # time1 = datetime.datetime.strptime("2023-09-30 00:00:00", "%Y-%m-%d %H:%M:%S").date()
    # time2 = datetime.datetime.strptime("2023-10-13 00:00:00", "%Y-%m-%d %H:%M:%S").date()
    # i=1
    # for row in data:
    #     if row["day"] > time1 and row["day"] < time2:
    #         e.append(str(i))
    #         i+=1
    #         end.append({"count":row["num"]}) 
    # print(e)
    # print(end)
    # l= getCarPlateData('XZP')
    # x=[]
    # y=[]

    # i=0
    # for l1 in l :
    #     i+=1
    #     x.append(l1["name"])
    #     y.append(l1["value"])
    #     if i>20:
    #         break
    # print(x)
    # print(y)

    # ll=getCarThroughTimeLatest()
    # for l2 in ll:
    #     e="<li>"+"<div>"+l2["CI_CarPlate"]+"</div>"+"<div>"+l2["CI_AddressId"]+"</div>"+"<div>"+str(l2["CI_ThroughTime"])+"</div>" +"</li>"
    #     print(e)
    
    # j=[]
    # xZP=[]
    # qJZLCHDD=[]
    # res = getAddressByDay()
    # for row in res:
    #     if row["CI_AddressId"] == "XZP":
    #         xZP.append({"count":row["num"]})
    #     if row["CI_AddressId"] == "QJZLCHDD":
    #         qJZLCHDD.append({"count":row["num"]})
    #     if row["CI_AddressId"] == "JHNC":
    #         j.append({"count":row["num"]})
    
    # print(j)
    # print(xZP)
    # print(qJZLCHDD)




