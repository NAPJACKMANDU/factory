<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>수칙 테이블</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f4f4f4;
            font-weight: bold;
        }

        tr:hover {
            background-color: #f1f1f1;
        }

        caption {
            margin: 10px 0;
            font-size: 1.2em;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <table>
        <caption>수칙 테이블</caption>
        <br>
        <thead>
            <tr>
                <input type="hidden" id="sr_idx" value="${member.companyIdx}">
                <th class="f_fire" name="sr_title">수칙 제목</th>
                <th class="sr_desc" name="sr_desc">수칙 분류</th>
                <th class="sr_date" name="created_at">수칙 등록일자</th>
            </tr>
        </thead>
        <tbody id="list">
        </tbody>
    </table>
	<!-- scripts -->
	<script src="/js/SaftyRules.js"></script>
</body>