import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const questions = [
  {
    id: 1,
    question: "What's your primary goal with a cold wallet?",
    options: [
      { value: "security", label: "Maximum security for long-term holding", tangemScore: 1, onekeyScore: 3 },
      { value: "convenience", label: "Easy daily use and portability", tangemScore: 3, onekeyScore: 2 },
      { value: "both", label: "Balance of both security and convenience", tangemScore: 2, onekeyScore: 3 }
    ]
  },
  {
    id: 2,
    question: "How much crypto are you planning to store?",
    options: [
      { value: "small", label: "Less than RM 5,000", tangemScore: 3, onekeyScore: 3, onekeyProduct: "classic_1s_pure" },
      { value: "medium", label: "RM 5,000 - RM 50,000", tangemScore: 2, onekeyScore: 2, onekeyProduct: "classic_1s" },
      { value: "large", label: "More than RM 50,000", tangemScore: 1, onekeyScore: 3, onekeyProduct: "pro" }
    ]
  },
  {
    id: 3,
    question: "Do you prefer using your wallet via mobile or desktop?",
    options: [
      { value: "mobile", label: "Mobile - I want to manage crypto on my phone", tangemScore: 3, onekeyScore: 2 },
      { value: "desktop", label: "Desktop - I prefer using my computer", tangemScore: 1, onekeyScore: 2 },
      { value: "both", label: "Both - I need flexibility", tangemScore: 2, onekeyScore: 3 }
    ]
  },
  {
    id: 4,
    question: "How important is a built-in screen for transaction verification?",
    options: [
      { value: "very", label: "Very important - I want to verify on the device", tangemScore: 0, onekeyScore: 3, onekeyProduct: "pro" },
      { value: "somewhat", label: "Somewhat important", tangemScore: 1, onekeyScore: 2 },
      { value: "not", label: "Not important - phone screen is fine", tangemScore: 3, onekeyScore: 1 }
    ]
  },
  {
    id: 5,
    question: "Do you prefer a wallet that fits in your regular wallet?",
    options: [
      { value: "yes", label: "Yes, credit card size is ideal", tangemScore: 3, onekeyScore: 2, onekeyProduct: "classic_1s" },
      { value: "no", label: "No, I don't mind a larger device", tangemScore: 0, onekeyScore: 2, onekeyProduct: "pro" },
      { value: "either", label: "Either works for me", tangemScore: 2, onekeyScore: 2 }
    ]
  },
  {
    id: 6,
    question: "How important is open-source firmware to you?",
    options: [
      { value: "very", label: "Very important - I want fully auditable code", tangemScore: 1, onekeyScore: 3, onekeyProduct: "pro" },
      { value: "somewhat", label: "Somewhat important", tangemScore: 1, onekeyScore: 2 },
      { value: "not", label: "Not important - I trust the brand", tangemScore: 3, onekeyScore: 1 }
    ]
  },
  {
    id: 7,
    question: "What's your experience level with crypto?",
    options: [
      { value: "beginner", label: "Beginner - I want something simple", tangemScore: 3, onekeyScore: 2, onekeyProduct: "classic_1s_pure" },
      { value: "intermediate", label: "Intermediate - I know the basics", tangemScore: 2, onekeyScore: 3, onekeyProduct: "classic_1s" },
      { value: "advanced", label: "Advanced - I want full control and features", tangemScore: 1, onekeyScore: 3, onekeyProduct: "pro" }
    ]
  },
  {
    id: 8,
    question: "Do you need Bluetooth connectivity for mobile use?",
    options: [
      { value: "yes", label: "Yes, Bluetooth is important for mobile", tangemScore: 1, onekeyScore: 3, onekeyProduct: "classic_1s" },
      { value: "no", label: "No, NFC or USB is fine", tangemScore: 3, onekeyScore: 1, onekeyProduct: "classic_1s_pure" },
      { value: "either", label: "Either works for me", tangemScore: 2, onekeyScore: 2 }
    ]
  }
];

const productRecommendations = {
  tangem: {
    classic_black: {
      name: "Tangem Wallet (3-Card Set) - Classic Black",
      price: 429,
      reason: "Timeless professional design with 3-card backup system",
      features: ["Most popular choice", "Professional look", "3 backup cards", "NFC tap technology"]
    },
    blush_sky: {
      name: "Tangem Wallet (3-Card Set) - Blush Sky",
      price: 429,
      reason: "Elegant pink and blue gradient for style-conscious users",
      features: ["Unique design", "Stand out look", "3 backup cards", "NFC tap technology"]
    },
    stealth: {
      name: "Tangem Wallet (3-Card Set) - Stealth",
      price: 429,
      reason: "Sleek all-black for maximum discretion",
      features: ["Discreet design", "All-black finish", "3 backup cards", "NFC tap technology"]
    }
  },
  onekey: {
    classic_1s_pure: {
      name: "OneKey Classic 1S Pure",
      price: 199,
      reason: "Most affordable open-source wallet with essential security",
      features: ["EAL 6+ Security", "Bluetooth & USB-C", "No battery needed", "30,000+ coins", "Bitcoin-Only mode"],
      level: "Entry Level"
    },
    classic_1s: {
      name: "OneKey Classic 1S",
      price: 299,
      reason: "Best value open-source wallet with full features",
      features: ["EAL 6+ Security", "Bluetooth & USB-C", "Clear signing preview", "30,000+ coins", "Security key"],
      level: "Intermediate"
    },
    pro: {
      name: "OneKey Pro",
      price: 799,
      reason: "Premium open-source wallet with touchscreen and advanced features",
      features: ["3.5\" Touchscreen", "Fingerprint sensor", "Air-gapped signing", "Wireless charging", "Real-time scam detection"],
      level: "Advanced"
    }
  }
};

export default function WalletQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    let tangemTotal = 0;
    let onekeyTotal = 0;
    let preferredOnekeyProduct = "classic_1s";
    let suggestedTangemColor = "classic_black";

    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      const answer = question.options.find(opt => opt.value === answerValue);
      tangemTotal += answer.tangemScore;
      onekeyTotal += answer.onekeyScore;
      
      if (answer.onekeyProduct) {
        preferredOnekeyProduct = answer.onekeyProduct;
      }
    });

    // Determine Tangem color preference
    if (answers[1] === "security") {
      suggestedTangemColor = "stealth";
    } else if (answers[1] === "convenience") {
      suggestedTangemColor = "blush_sky";
    }

    // Find the highest score
    const scores = { tangem: tangemTotal, onekey: onekeyTotal };
    const recommendation = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    const specificProduct = recommendation === 'tangem' 
      ? productRecommendations.tangem[suggestedTangemColor]
      : productRecommendations.onekey[preferredOnekeyProduct];
    
    setResult({
      recommendation,
      tangemScore: tangemTotal,
      onekeyScore: onekeyTotal,
      specificProduct,
      suggestedTangemColor,
      preferredOnekeyProduct
    });
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[currentQuestionData?.id];

  if (showResult && result) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="glass-card border-2 border-[#00ffc6]/30 glow-effect">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-[#00ffc6]" />
              </div>
              <CardTitle className="text-3xl text-white mb-2">Your Perfect Wallet Match!</CardTitle>
              <p className="text-[#c6fff0]">Based on your answers, we recommend:</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.recommendation === 'onekey' ? (
                <div className="bg-green-500/10 rounded-xl p-8 border-2 border-green-400">
                  <div className="mb-3">
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-green-400 text-[#071018]">
                      {result.specificProduct.level}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-green-400 mb-2">{result.specificProduct.name}</h3>
                  <p className="text-xl text-white mb-1">RM {result.specificProduct.price}</p>
                  <p className="text-lg text-[#c6fff0] mb-6">{result.specificProduct.reason}</p>
                  <div className="space-y-3 mb-6">
                    {result.specificProduct.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-[#bfeee0]">{feature}</p>
                      </div>
                    ))}
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[#bfeee0]">Open-source firmware (fully auditable)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[#bfeee0]">Authorized reseller with warranty support</p>
                    </div>
                  </div>

                  {result.preferredOnekeyProduct !== "pro" && (
                    <div className="mt-6 p-4 rounded-lg bg-[#0b2221] border border-green-400/30">
                      <p className="text-sm text-[#c6fff0] mb-2">
                        <strong className="text-green-400">Want premium features?</strong> Consider upgrading to:
                      </p>
                      <div className="text-sm text-[#bfeee0]">
                        • OneKey Pro - Touchscreen, fingerprint, wireless charging (RM 799)
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link to={createPageUrl("OneKey")} className="flex-1 min-w-[200px]">
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 text-lg">
                        Shop OneKey Wallets
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : result.recommendation === 'tangem' ? (
                <div className="bg-[#00ffc6]/10 rounded-xl p-8 border-2 border-[#00ffc6]">
                  <h3 className="text-3xl font-bold text-[#00ffc6] mb-2">{result.specificProduct.name}</h3>
                  <p className="text-xl text-white mb-1">RM {result.specificProduct.price}</p>
                  <p className="text-lg text-[#c6fff0] mb-6">{result.specificProduct.reason}</p>
                  <div className="space-y-3 mb-6">
                    {result.specificProduct.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                        <p className="text-[#bfeee0]">{feature}</p>
                      </div>
                    ))}
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                      <p className="text-[#bfeee0]">Simple NFC tap - no cables needed</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                      <p className="text-[#bfeee0]">No seed phrases to manage</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                      <p className="text-[#bfeee0]">Perfect for everyday use and travel</p>
                    </div>
                  </div>
                  
                  {/* Other Tangem Options */}
                  <div className="mt-6 p-4 rounded-lg bg-[#0b2221] border border-[#00ffc6]/30">
                    <p className="text-sm text-[#c6fff0] mb-3">
                      <strong className="text-[#00ffc6]">Also available in other colors:</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(productRecommendations.tangem)
                        .filter(([key]) => key !== result.suggestedTangemColor)
                        .map(([key, product]) => (
                          <div key={key} className="text-[#bfeee0]">• {product.name.split(" - ")[1]}</div>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link to={createPageUrl("Shop")} className="flex-1 min-w-[200px]">
                      <Button className="w-full bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold py-6 text-lg">
                        Shop Tangem Wallets
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : null}

              {/* Score Breakdown */}
              <div className="bg-[#0b2221] rounded-xl p-6">
                <h4 className="font-bold text-lg mb-4 text-white">Your Score Breakdown</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#c6fff0]">Tangem Match</span>
                      <span className="text-[#00ffc6] font-bold">{result.tangemScore} points</span>
                    </div>
                    <div className="w-full bg-[#021213] rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(result.tangemScore / 24) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#c6fff0]">OneKey Match</span>
                      <span className="text-green-400 font-bold">{result.onekeyScore} points</span>
                    </div>
                    <div className="w-full bg-[#021213] rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(result.onekeyScore / 24) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-[#00ffc6] text-[#00ffc6] hover:bg-[#00ffc6] hover:text-[#071018]"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <a href="https://wa.me/60167736549" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold">
                    💬 Get Expert Advice
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Find Your <span className="text-[#00ffc6]">Perfect Wallet</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto">
          Answer a few quick questions to discover which cold wallet suits your needs best
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-[#c6fff0] mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-[#0b2221] rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card border-[#00ffc6]/20 glow-effect">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {currentQuestionData.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[currentQuestionData.id] || ""}
                  onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}
                  className="space-y-3"
                >
                  {currentQuestionData.options.map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        answers[currentQuestionData.id] === option.value
                          ? 'border-[#00ffc6] bg-[#00ffc6]/10'
                          : 'border-[#00ffc6]/20 hover:border-[#00ffc6]/50'
                      }`}
                      onClick={() => handleAnswer(currentQuestionData.id, option.value)}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer text-[#c6fff0] text-base"
                      >
                        {option.label}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {currentQuestion > 0 && (
                    <Button
                      onClick={goToPrevious}
                      variant="outline"
                      className="border-[#00ffc6] text-[#00ffc6] hover:bg-[#00ffc6] hover:text-[#071018]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={goToNext}
                    disabled={!isAnswered}
                    className="flex-1 bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}