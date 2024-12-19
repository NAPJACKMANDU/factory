import MySQLdb

# MySQL 서버에 연결
conn = MySQLdb.connect(
    host='',
    user='',
    passwd='',
    db='',
    port=3312  # 포트 번호 추가
)

# 커서 생성
cursor = conn.cursor()

# 파라미터화된 쿼리 실행
sql_query = """
    INSERT INTO tb_clip ( 
        clip_name,
        clip_size, 
        camera_idx, 
        created_at, 
        clip_path, 
        company_idx, 
        clip_ext
    ) VALUES (%s, %s ,%s, NOW(6), %s, %s, %s)
"""
data = (
    'fall_detected_20241209_175021.webm',  # clip_name
    0, #clip_size
    1,  # camera_idx
    r'클립 저장 위치치',  # clip_path
    1,  # company_idx
    '.mp4'  # clip_ext
)

try:
    # 쿼리 실행
    cursor.execute(sql_query, data)
    # 변경사항 커밋
    conn.commit()
    print("Data inserted successfully.")
except MySQLdb.Error as e:
    print("Error while inserting data:", e)
finally:
    # 연결과 커서 닫기
    cursor.close()
    conn.close()
