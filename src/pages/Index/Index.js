import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import FileUpload from "../../components/FileUpload/FIleUpload";
import Header from "../../components/Header/Header";
import useAuth from "../../hooks/useAuth";
import { getStorageUsage, saveStamp } from "../../services/stamps";
import styles from "./Index.module.scss";
import generateToken from "../../utils/generateToken";
import { useState } from "react";

const FILE_LIMIT = 100;

const IndexPage = () => {
  const { user } = useAuth();

  const [canUpload, setCanUpload] = useState(true);

  const headerLinks = [];

  const createStamp = async (payload) => {
    try {
      const body = { ...payload };
      let token = localStorage.getItem("noAuthToken") || generateToken();

      if (!user?.uid) {
        localStorage.setItem("noAuthToken", token);
        body.token = token;
      }
      await saveStamp(body);
      alert("stamp saved");
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const checkFileLimit = async (size) => {
    const token = localStorage.getItem("noAuthToken");
    if (user?.uid || !token) return;
    try {
      setCanUpload(false);
      const totalStorage = await getStorageUsage(token);
      const allowUpload = totalStorage + size <= FILE_LIMIT;
      setCanUpload(allowUpload);
      if (!allowUpload) alert("Limit Exceeded");
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
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
                  Secure Cloud Storage & Communication
                </h2>
                <span className="fw-light">
                  Get Premium Account today. Check out our awesome deal
                </span>
                <FileUpload
                  className={`${styles.HeroFileUpload} shadow-sm`}
                  handleSuccess={(payload) =>
                    createStamp({
                      ...payload,
                      userId: user?.uid || "",
                    })
                  }
                  canUpload={canUpload}
                  onFileChange={(size) => checkFileLimit(size)}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className={`row justify-content-center ${styles.FooterCard}`}>
        <div className="col-12 col-md-6 ">
          <Card
            bgColor="#ff76762e"
            className="py-5 px-3 px-md-5 d-flex justify-content-between align-items-center flex-column flex-md-row"
          >
            <span className="text-primary">
              Do you want 50GB Free* storage?
            </span>

            <Button
              label="Create An Account"
              className="fw-little mt-3 mt-md-0"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
