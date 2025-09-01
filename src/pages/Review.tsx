import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Image, 
  Video, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Download,
  CheckCircle,
  AlertCircle,
  Eye
} from "lucide-react";

const Review = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      // Simulate API call - replace with actual backend
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock review data
        const mockReview = {
          id,
          fileName: "marketing_campaign_2024.jpg",
          fileType: "image/jpeg",
          fileSize: "2.4 MB",
          uploadDate: new Date().toISOString(),
          status: Math.random() > 0.5 ? "completed" : "pending",
          analysis: {
            complianceScore: 85,
            issues: [
              {
                type: "warning",
                message: "Consider adding disclaimer text for financial claims",
                severity: "medium"
              },
              {
                type: "info", 
                message: "Image meets accessibility contrast requirements",
                severity: "low"
              }
            ],
            recommendations: [
              "Add required FDA disclaimer",
              "Update copyright notice",
              "Consider mobile-friendly text size"
            ]
          }
        };
        
        setReview(mockReview);
      } catch (error) {
        console.error('Failed to fetch review:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const getFileIcon = (type: string) => {
    if (type?.includes('image')) return <Image className="h-5 w-5" />;
    if (type?.includes('video')) return <Video className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending Analysis</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">Loading review details...</p>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Review Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested review could not be found.</p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="hover:bg-secondary/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-brand" />
              <span className="text-xl font-bold">GetCleared.ai</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Review Header */}
          <Card className="p-6 shadow-card border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getFileIcon(review.fileType)}
                <div>
                  <h1 className="text-2xl font-bold">{review.fileName}</h1>
                  <p className="text-muted-foreground">Review ID: {review.id}</p>
                </div>
              </div>
              {getStatusBadge(review.status)}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">File Size</p>
                  <p className="font-medium">{review.fileSize}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Upload Date</p>
                  <p className="font-medium">{new Date(review.uploadDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Upload Time</p>
                  <p className="font-medium">{new Date(review.uploadDate).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </Card>

          {/* Analysis Results */}
          {review.status === 'completed' && review.analysis && (
            <>
              <Card className="p-6 shadow-card border-border bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Compliance Analysis</h2>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Compliance Score</p>
                    <p className="text-2xl font-bold text-green-500">{review.analysis.complianceScore}%</p>
                  </div>
                </div>

                {review.analysis.issues && review.analysis.issues.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium mb-2">Issues Found</h3>
                    {review.analysis.issues.map((issue: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 border border-border">
                        {issue.type === 'warning' ? (
                          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{issue.message}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {issue.severity} priority
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="p-6 shadow-card border-border bg-card/50 backdrop-blur-sm">
                <h3 className="font-semibold mb-4">Recommendations</h3>
                <div className="space-y-2">
                  {review.analysis.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <p className="text-muted-foreground">{rec}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {review.status === 'pending' && (
            <Card className="p-8 text-center shadow-card border-border bg-card/50 backdrop-blur-sm">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analysis in Progress</h3>
              <p className="text-muted-foreground">
                Your file is being analyzed by our AI systems. This typically takes 2-5 minutes.
              </p>
            </Card>
          )}

          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate('/new-review')} variant="outline">
              Upload Another File
            </Button>
            <Button onClick={() => navigate('/')} className="bg-gradient-brand hover:opacity-90">
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Review;