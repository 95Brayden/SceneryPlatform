package com.example.scenerymonitor;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class StationInfoController {

    private static final String JSON_FILE_PATH = "E:/Desktop/scenerymonitor/public/static/data/stationinfo.json";
    private static final String IMAGE_DIRECTORY = "E:/Desktop/scenerymonitor/public/static/images/show/";

    @CrossOrigin(origins = "http://localhost:8081")
    @PostMapping("/add_site")
    public ResponseEntity<String> addSite(@RequestParam Map<String, String> formData,
                                          @RequestParam("site_pic_upload") MultipartFile sitePic) {
        try {
            // 读取原始JSON文件内容
            Map<String, Object> dataMap = readJson();

            // 获取站点信息数组
            List<Map<String, String>> siteDataList = (List<Map<String, String>>) dataMap.get("data");

            // 添加图片文件名到 formData 中
            formData.put("site_pic", sitePic.getOriginalFilename());

            // 将新数据添加到列表中
            siteDataList.add(formData);

            // 将数据存储到JSON文件中
            saveToJson(dataMap);

            // 保存图片文件
            saveImage(sitePic);

            return ResponseEntity.ok("Data added successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing request");
        }
    }

    private Map<String, Object> readJson() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        File file = new File(JSON_FILE_PATH);

        // 如果文件不存在，则创建新文件
        if (!file.exists()) {
            file.createNewFile();
            return Map.of("sheet_name", "Sheet1", "data", new ArrayList<>());
        }

        // 读取JSON文件内容并返回Map对象
        return mapper.readValue(file, Map.class);
    }

    private void saveToJson(Map<String, Object> data) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        File file = new File(JSON_FILE_PATH);

        // 写入JSON数据
        mapper.writeValue(file, data);
    }

    private void saveImage(MultipartFile image) throws IOException {
        // 获取图片名称
        String imageName = image.getOriginalFilename();

        // 写入图片文件
        image.transferTo(new File(IMAGE_DIRECTORY + imageName));
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(method = RequestMethod.OPTIONS, value = "/add_site")
    public ResponseEntity<?> options() {
        return ResponseEntity.ok().build();
    }
}
