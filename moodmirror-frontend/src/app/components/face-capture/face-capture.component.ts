import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-face-capture',
  standalone: false,
  templateUrl: './face-capture.component.html',
  styleUrl: './face-capture.component.scss'
})
export class FaceCaptureComponent implements OnInit {
  @ViewChild('video') videoRef!: ElementRef;
  loading = true;
  detectedExpression = '';

  async ngOnInit() {
    await this.loadModels();
    this.startVideo();
  }

  async loadModels() {
    const MODEL_URL = '/assets/models';

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
    ]);
    this.loading = false;
  }

  startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoRef.nativeElement.srcObject = stream;
        this.detectExpressions();
      })
      .catch((err) => console.error('Erro ao acessar a câmera:', err));
  }

  detectExpressions() {
    const video = this.videoRef.nativeElement;
    video.addEventListener('play', () => {
      const interval = setInterval(async () => {
        const result = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        if (result && result.expressions) {
          const sorted = Object.entries(result.expressions).sort((a, b) => b[1] - a[1]);
          this.detectedExpression = sorted[0][0];
        }
      }, 1000);
    });
  }
}

