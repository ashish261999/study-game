package com.study.studyGame.data;

import com.study.studyGame.beans.TopicBean;
import com.study.studyGame.repository.TopicRepo;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TopicData implements TopicRepo {
    public List<TopicBean> getTopics(){
        List<TopicBean> topics = new ArrayList<>();
        TopicBean topicBean = new TopicBean("Configuration", "This is configuration");
        TopicBean topicBean1 = new TopicBean("Bean Creation", "This is bean creation");

        topics.add(topicBean);
        topics.add(topicBean1);
        return topics;
    }
}
