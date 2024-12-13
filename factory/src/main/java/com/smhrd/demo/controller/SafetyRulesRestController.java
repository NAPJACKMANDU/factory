package com.smhrd.demo.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.model.IncidentModel;
import com.smhrd.demo.model.SafetyRulesModel;
import com.smhrd.demo.service.SafetyRulesService;

import jakarta.servlet.http.HttpSession;

@RestController
public class SafetyRulesRestController {

    @Autowired
    SafetyRulesService service;

    @PostMapping("/SafetyForm")
    public ResponseEntity<String> SafetyRulesUpdate(
            @RequestParam("file") MultipartFile file,
            @RequestParam("srTitle") String srTitle,
            @RequestParam("srDesc") String srDesc,
            HttpSession session) throws IOException {

        // 1. 기존 데이터 확인
        List<SafetyRulesModel> safetyList = service.getAllSafetyRules();
        boolean isDuplicate = safetyList.stream()
                                        .anyMatch(existing -> existing.getSrTitle().equals(srTitle));

        if (isDuplicate) {
            return ResponseEntity.badRequest().body("이미 동일한 제목의 데이터가 존재합니다.");
        }

        // 2. 새 데이터 저장
        SafetyRulesModel safety = new SafetyRulesModel();
        safety.setSrDesc(srDesc);
        safety.setSrTitle(srTitle);
        System.out.println(safety.getSrDesc());
        service.safetyRulesdata(file, safety, session);

        return ResponseEntity.ok("파일이 성공적으로 업로드되었습니다.");
    }
    
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
  
}
