import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import FileUpload from "../../components/FileUpload/FIleUpload";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useAuth from "../../hooks/useAuth";
import {
  getStorageUsage,
  saveStamp,
  stampDocument,
} from "../../services/stamps";
import styles from "./Index.module.scss";
import generateToken from "../../utils/generateToken";
import { useState } from "react";
import StampPositioner from "../../components/StampPositioner/StampPositioner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { setCanUpload } from "../../features/userSlice";

const FILE_LIMIT = 100000;

const IndexPage = () => {
  const { user } = useAuth();

  const [showPreview, setShowPreview] = useState(false);
  const [docPreview, setDocPreview] = useState({});
  const { documentUrl, stampUrl } = docPreview;

  const dispatch = useDispatch();

  const headerLinks = [];

  const createStamp = async (payload) => {
    try {
      const body = { ...payload };
      let token = localStorage.getItem("noAuthToken") || generateToken();

      if (!user?.uid) {
        localStorage.setItem("noAuthToken", token);
        body.token = token;
      }
      const resp = await stampDocument(body);
      if (resp.status === 200) {
        await saveStamp({ ...body, stampedUrl: resp.data.stamped_url });
      }

      // todo toast
      console.log(resp?.data?.stamped_url, "stamped url");
      alert(`stamp saved. Check consolf for stamp url `);
    } catch (error) {
      console.log(`error`, error);
      throw error;
    }
  };

  const checkFileLimit = async (size) => {
    const token = localStorage.getItem("noAuthToken");
    if (user?.uid || !token) return;
    try {
      const totalStorage = await getStorageUsage(token);
      const allowUpload = totalStorage + size <= FILE_LIMIT;
      dispatch(setCanUpload(allowUpload));
      if (!allowUpload) alert("Limit exceeded"); // todo toast
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`container position-relative ${styles.Main}`}>
        <Header links={headerLinks} />
        <div className="row mt-3 mb-5 mb-md-0">
          <div className="col-12">
            <Card
              className={`${styles.Hero} py-5 px-3 px-md-5`}
              bgColor="#ace4da45"
            >
              <div className="row justify-content-center">
                <div className="col-12 col-md-6 text-center text-primary">
                  <h2 className="fw-bold mb-3 px-3 px-md-0">
                    Secure File Upload <br /> Storage & Stamp
                  </h2>
                  <span className="fw-light">
                    Get Premium Account today. Check out our awesome deal
                  </span>
                  <FileUpload
                    className={`${styles.HeroFileUpload} shadow-sm`}
                    handleSuccess={(payload) => {
                      setDocPreview({
                        ...payload,
                      });
                      setShowPreview(true);
                    }}
                    onFileChange={(size) => checkFileLimit(size)}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className={`row justify-content-center ${styles.FooterCard}`}>
          {/* <div className="col-12 col-md-6 ">
            <Card
              bgColor="#ff76762e"
              className="py-5 px-3 px-md-5 d-flex justify-content-between align-items-center flex-column flex-md-row"
            >
              <span className="text-primary">
                Do you want 10MB Free* storage?
              </span>

              <Button
                label="Create An Account"
                className="fw-little mt-3 mt-md-0"
              />
            </Card>
          </div> */}
          <div className="col-12">
            <Footer />
          </div>
        </div>
        <StampPositioner
          stamp={stampUrl}
          doc={documentUrl}
          show={showPreview}
          handleHide={() => setShowPreview(false)}
          handleSubmit={({ stampPosition, width, height, customText, color }) =>
            createStamp({
              ...docPreview,
              ...stampPosition,
              userId: user?.uid || "",
              width,
              height,
              customText,
              color,
            })
          }
        />
      </div>
    </DndProvider>
  );
};

export default IndexPage;
