import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon, FileText, Image, Video, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate API upload - replace with actual backend call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock review ID
      const reviewId = Math.random().toString(36).substring(2, 15);
      
      toast({
        title: "Upload successful!",
        description: "Your file has been uploaded and is being analyzed.",
      });
      
      navigate(`/review/${reviewId}`);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="h-8 w-8" />;
    if (type.includes('video')) return <Video className="h-8 w-8" />;
    return <FileText className="h-8 w-8" />;
  };

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

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-brand bg-clip-text text-transparent">
              Upload Your Content
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload your marketing content for AI-powered compliance review
            </p>
          </div>

          <Card className="p-8 shadow-card border-border bg-card/50 backdrop-blur-sm">
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
              
              {isUploading ? (
                <div className="space-y-4">
                  <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                  <p className="text-lg font-medium">Uploading your file...</p>
                  <p className="text-muted-foreground">This may take a moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium mb-2">
                      Drag and drop your file here, or{' '}
                      <label htmlFor="file-upload" className="text-primary hover:text-primary/80 cursor-pointer underline">
                        browse
                      </label>
                    </p>
                    <p className="text-muted-foreground">
                      Supports images, videos, documents (PDF, DOC, TXT)
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <Image className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Images</p>
                <p className="text-xs text-muted-foreground">JPG, PNG, GIF</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <Video className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Videos</p>
                <p className="text-xs text-muted-foreground">MP4, AVI, MOV</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <FileText className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Documents</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, TXT</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Upload;