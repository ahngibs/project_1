document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
    let currentQuestionIndex = 0;
    let answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('hidden', i !== index);
        });
    }

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const questionElement = this.closest('.question');
            const questionType = this.dataset.type;
            const answerValue = this.dataset.value;
            
            answers[answerValue]++;

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex);
            } else {
                showResult();
            }
        });
    });

    function showResult() {
        const result = 
            (answers.E > answers.I ? 'E' : 'I') +
            (answers.S > answers.N ? 'S' : 'N') +
            (answers.T > answers.F ? 'T' : 'F') +
            (answers.J > answers.P ? 'J' : 'P');

        const resultText = `당신의 MBTI 유형은 ${result}입니다.`;

        // 결과 텍스트 설정
        document.getElementById('quiz').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('result-text').textContent = resultText;

        // 결과 이미지 설정
        const resultImage = document.getElementById('result-image');
        let resultImageUrl = 'images/default.png'; // 디폴트 이미지 경로
        switch(result) {
            case 'INFP':
                resultImageUrl = 'https://mblogthumb-phinf.pstatic.net/MjAyMDA5MDZfMjEz/MDAxNTk5MzYyMjQ1MzA0.s9bxF2E-wDag_MOb85jCOIqafwx_OwUDv1CLWZAJUvkg.zLaZiwbYq9dYzpFr0c9y4ogQeYC-aqgpWtbhUVfaAeAg.PNG.jamsys/20200906_포스팅_이미지.png?type=w800'; // 실제 이미지 경로로 변경
                break;
            // 추가적인 MBTI 유형에 대한 케이스를 여기 추가할 수 있습니다
            default:
                resultImageUrl = 'https://ahngibs.github.io/project_1/og_image.png'; // 기본 이미지 경로 설정
        }
        resultImage.src = resultImageUrl;

        // 공유 버튼 클릭 이벤트 설정
        const shareUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent(`나의 MBTI 유형은 ${result}입니다!`);

        document.getElementById('share-facebook').onclick = function() {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank');
        };
        document.getElementById('share-twitter').onclick = function() {
            window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank');
        };
        document.getElementById('share-kakao').onclick = function() {
            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: 'MBTI 유형 결과',
                    description: `나의 MBTI 유형은 ${result}입니다!`,
                    imageUrl: resultImageUrl, // 결과 이미지 URL 설정
                    imageWidth: 300, // 원하는 이미지 너비 설정
                    imageHeight: 300, // 원하는 이미지 높이 설정
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href
                    }
                },
                buttons: [
                    {
                        title: '웹으로 보기',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href
                        }
                    }
                ]
            });
        };
    }

    document.getElementById('restart').addEventListener('click', function() {
        currentQuestionIndex = 0;
        answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        showQuestion(currentQuestionIndex);
        document.getElementById('quiz').classList.remove('hidden');
        document.getElementById('result').classList.add('hidden');
    });

    showQuestion(currentQuestionIndex);

    // Kakao 초기화
    Kakao.init('73e55881b8be12b9f386d0804d8c15e8'); // 여기에 Kakao JavaScript 키를 입력하세요.
});
