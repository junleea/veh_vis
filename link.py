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
    # 浣跨敤 cursor() 鏂规硶鍒涘缓涓€涓父鏍囧璞� cursor
    try:
        # 鍒涘缓鏁版嵁搴撹繛鎺�
        
        # 鍦ㄨ繖閲岃繘琛屾暟鎹簱鎿嶄綔
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
            #鏃堕棿閫氳繃鏃堕棿CI_ThroughTime涔嬪樊鍦�10鍒嗛挓浠ヤ笂鐨勮繛鎺ョ嚎涓嶆樉绀�
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

def getNodesCount():
    sql="select CI_AddressId as name,count(CI_AddressId) as value from zakk_carinfo_202310 group by CI_AddressId order by value desc ;"
    list1 = get_info_mysql(sql)
    return list1

def getCountByMonth():
    #鑾峰彇姣忔湀鐨勮溅杈嗘暟閲�
    sql="select month(CI_ThroughTime) as month,count(CI_CarPlate) as num from zakk_carinfo_202310 group by month(CI_ThroughTime) order by month(CI_ThroughTime);"
    list1 = get_info_mysql(sql)
    return list1

def getCountByWeek():
    #鑾峰彇姣忓懆鐨勮溅杈嗘暟閲�
    sql="select week(CI_ThroughTime) as week,count(CI_CarPlate) as num from zakk_carinfo_202310 group by week(CI_ThroughTime) order by week(CI_ThroughTime);"
    list1 = get_info_mysql(sql)
    return list1

def getCarPlateData(node):
    #杞︾墝棣栧瓧姣�
    sql = "select left(CI_CarPlate,1) as name,count(CI_CarPlate) as value from zakk_carinfo_202310 where CI_AddressId='XZP' group by left(CI_CarPlate,1) order by value desc;"
    list1 = get_info_mysql(sql)
    return list1


def getCarPlateByDay(node,date):
    #鑾峰彇鏌愬ぉ鏌愯妭鐐圭殑杞︼拷锟芥暟閲�
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
    #鑾峰彇姣忓ぉ鐨勮溅杈嗘暟閲�
    sql="select date(CI_ThroughTime) as day,count(CI_CarPlate) as num from zakk_carinfo_202310 group by date(CI_ThroughTime) order by date(CI_ThroughTime);"
    list1 = get_info_mysql(sql)
    return list1


def getAddressAllCount():
    sql="select zakk_carinfo_202310.CI_AddressId as areaName,count(zakk_carinfo_202310.CI_AddressId) as count from zakk_carinfo_202310 group by CI_AddressId order by count desc;"
    list1 = get_info_mysql(sql)
    print(list1)

if __name__ == "__main__":
    getAddressAllCount()
    # cars=getCars()
    # getLinks(cars)
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
    l= getCarPlateData('XZP')
    x=[]
    y=[]

    i=0
    for l1 in l :
        i+=1
        x.append(l1["name"])
        y.append(l1["value"])
        if i>20:
            break
    print(x)
    print(y)

    # ll=getCarThroughTimeLatest()
    # for l2 in ll:
    #     e="<li>"+"<div>"+l2["CI_CarPlate"]+"</div>"+"<div>"+l2["CI_AddressId"]+"</div>"+"<div>"+str(l2["CI_ThroughTime"])+"</div>" +"</li>"
    #     print(e)
    
    j=[]
    xZP=[]
    qJZLCHDD=[]
    res = getAddressByDay()
    for row in res:
        if row["CI_AddressId"] == "XZP":
            xZP.append({"count":row["num"]})
        if row["CI_AddressId"] == "QJZLCHDD":
            qJZLCHDD.append({"count":row["num"]})
        if row["CI_AddressId"] == "JHNC":
            j.append({"count":row["num"]})
    
    print(j)
    print(xZP)
    print(qJZLCHDD)




