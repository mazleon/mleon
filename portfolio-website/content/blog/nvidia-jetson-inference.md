---
slug: nvidia-jetson-inference
title: "How I Got <50ms Inference on NVIDIA Jetson Orin"
description: "Step-by-step optimization journey from basic YOLO v12 to TensorRT INT8 on DeepStream, achieving 47ms latency at the edge."
category: ["tutorials", "frameworks"]
tags: ["Edge AI", "Computer Vision", "TensorRT", "DeepStream"]
image: "/images/projects/blogs/Ai-1-banner.original.png"
publishDate: "February 22, 2025"
readTime: "10 min read"
---

Deploying high-accuracy object detection on edge devices is a significant challenge. In this post, I detail the journey of optimizing a YOLO v12 model using TensorRT INT8 quantization and DeepStream on NVIDIA Jetson Orin. I cover the calibration dataset approach, the accuracy vs. latency tradeoff decisions, and the exact pipeline architecture used to achieve a consistent 47ms latency.